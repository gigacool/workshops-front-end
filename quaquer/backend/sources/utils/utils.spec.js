const { generateGUID } = require('./utils');

describe('generateGUID', () => {

    it('should generate a valid GUID', () => {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    const guid = generateGUID();
    expect(guid).toMatch(guidRegex);
  });

  it('should generate different GUIDs everytime (if it fails, take a day off)', () => {
    const guid1 = generateGUID();
    const guid2 = generateGUID();

    expect(guid1).not.toBe(guid2);
  });

});