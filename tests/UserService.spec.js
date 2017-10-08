describe('UserService', function () {
  beforeEach(module('app'))

  var UserService, $httpBackend

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService')
    $httpBackend = $injector.get('$httpBackend')

    $httpBackend.when('GET', '/rest/user').respond({first_name: "Andrew", last_name: "Bonner"})
  }))

  it('should get the user\'s logged in information from \'/rest/user\'', function () {
    $httpBackend.expectGET('/rest/user')

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data
        if(data.first_name === 'Andrew' && data.last_name === 'Bonner') {
          done()
        }
      })
  })

  it('should join the user\'s first and last name togehter', function () {
    expect(UserService.createFullName({first_name: "Nancy", last_name: "Bonner"})).toEqual("Nancy Bonner")
  })
});
