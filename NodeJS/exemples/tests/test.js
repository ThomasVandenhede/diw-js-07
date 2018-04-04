const exemple10 = require('../exemple10.js');

const assert = require('assert');

describe('Je vais tester ma fonction somme', function() {
	it('devrait me donner 10 si je lui donne 5 et 5', function(){
		assert.deepStrictEqual(exemple10.somme(5, 5), 10);
	});
	it('devrait me donner 10 si je lui donne 5 et \'5\'', function(){
		assert.deepStrictEqual(exemple10.somme('5', 5), 10);
	});
	it('devrait me donner 10 si je lui donne \'5\' et 5', function(){
		assert.deepStrictEqual(exemple10.somme(5, '5'), 10);
	});
	it('devrait me donner 5 si je lui donne que 5 en premier', function(){
		assert.deepStrictEqual(exemple10.somme(5), 5);
	});
	it('devrait me donner 5 si je lui donne que 5 en deuxième', function(){
		assert.deepStrictEqual(exemple10.somme(undefined , 5), 5);
	});
	it('devrait me donner 0 si je ne lui donne rien', function(){
		assert.deepStrictEqual(exemple10.somme(), 0);
	});
});