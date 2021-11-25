const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export { renderTemplate };
