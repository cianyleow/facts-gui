define([], function() {	'use strict';	return [function() {		var storageKey = 'auth_token';		return {			store: function(token) {				return localStorage.setItem(storageKey, token);			},			retrieve: function() {				return localStorage.getItem(storageKey);			},			clear: function() {				return localStorage.removeItem(storageKey);			},			userInfo: function() {				var token = localStorage.getItem(storageKey);				if(token === null) {					return null;				} else {					return JSON.parse(atob(token.split('.')[0]));				}			}		};	}];});