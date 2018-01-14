# ng-mediacheck

`ng-mediacheck` provides a service that **adds media query event listeners to your [Angular](https://angular.io) application**. It can be used to manipulate component properties, templates, and behavior when matching different media queries. It is a spiritual successor to Angular v1.x [angularjs-mediaCheck](https://github.com/kmaida/angularjs-mediaCheck), but has been revamped and greatly simplified for a more modern Angular implementation.

## Installation

```bash
npm install ng-mediacheck --save
```

## Setup

Add the module and service to your Angular app:

```js
// src/app/app.module.ts
import { NgMediacheckModule } from 'ng-mediacheck';
import { MediacheckService } from 'ng-mediacheck';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    NgMediacheckModule.forRoot()
  ],
  providers: [
    MediacheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## How it Works

Check out the service source code here: [`mediacheck.service.ts`](https://github.com/kmaida/ng-mediacheck/blob/master/src/mediacheck.service.ts).

### Methods

The following methods are provided by `MediacheckService`:

#### setQueries(customMqs)

Out of the box, the service currently provides two simple media queries. They are defined in the service like so:

```
mqueries = {
  small: '(max-width: 767px)',
  large: '(min-width: 768px)'
};
```

You may, of course, provide your own different breakpoints in your app that the service will then use. You can do so by passing them to the `setQueries(customMqsObj)` method like so:

```
  customMqs = {
    mobile: '(max-width: 480px)',
    tablet: '(min-width: 481px) and (max-width: 768px)',
    desktop: '(min-width: 769px)'
  };

  constructor(private mediacheck: MediacheckService) {
    this.mediacheck.setQueries(this.customMqs);
  }
```

#### initSubject()

This method initializes a [subject](https://medium.com/@benlesh/on-the-subject-of-subjects-in-rxjs-2b08b7198b93): `mq$`. This subject provides a _stream_ that emits a value whenever the browser's media query changes. If you wish to use subscriptions to execute functionality when the breakpoint changes, then run the `initSubject()` method in your component's constructor and then subscribe to the `mq$` subject that is subsequently created.

This can be done like so:

```
  constructor(private mediacheck: MediacheckService) {
    this.mediacheck.initSubject();
  }

  ngOnInit() {
    this.mediacheck.mq$.subscribe(mq => {
      console.log('current mq:', mq);
    });
  }
```

> **Note:** If you want to use your own custom media queries, you must pass them to the `setQueries(customMqsObj)` method _before_ calling `initSubject()`. If you do not, the subject will initialize using the default media queries defined in MediacheckService.

#### check(mqName) 

`check(mqName)` expects a `string` parameter with the name of the media query you'd like to match, e.g., `small`, `large`, etc. 

* This is a shortcut for `window.matchMedia('mediaquerystring').matches`.
* It will return `true` if the media query currently matches and `false` if it doesn't.
* It will output a warning if it can't find a media query registered with the `mqName` provided.

#### getMqName()

`getMqName()` returns the string key for the currently active media query, e.g., `small`, `large`, etc.

#### onMqChange(mqName, callback)

`onMqChange(mqName, callback)` expects a `string` parameter with the name of the media query you'd like to match, e.g., `small`, `large`, etc. It also expects a callback `function`. This function will execute when the media query activates.

* This method [adds a MediaQueryList listener](https://msdn.microsoft.com/library/hh772467.aspx) with the `callback` parameter.
* On media query change, it executes the callback function and passes the [`MediaQueryList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) parameter so your components can utilize it.
* It implements [zones](http://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html) for Angular change detection.
