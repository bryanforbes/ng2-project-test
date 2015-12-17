import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

@Component({
	selector: 'app',
	template: `Hello 2`
})
export class App {
}

bootstrap(App, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS
]);
