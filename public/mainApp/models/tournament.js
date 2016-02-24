angular
  .module('golf-app')
  .factory('Tournament', Tournament)

Tournament.$inject = ['$resource', 'API']
function Tournament($resource, API){

  return $resource(
    API+'/tournaments/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'update':    { method: 'PATCH' },
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'addImage': {
        url: API +'/addimage/:id',
        method: "POST"
      },
      'deleteImage': {
        url: API +'/deleteimage/:id',
        method: "PUT"
      },
    }
  );
}