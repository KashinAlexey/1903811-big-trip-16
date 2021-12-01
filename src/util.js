const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

export { renderTemplate, getKeyByValue };
