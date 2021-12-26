const filter = (type) => {
  const elDiv = document.createElement('div');
  elDiv.classList.add('filter', 'py-5');
  const tamplate = `<b class="px-3">${type}</b>
  <form class="px-2">
    <select class="p-1">
      <option value="records">Date creation (Asc)</option>
      <option value="creation date">minus</option>
    </select>
  </form>`;

  elDiv.innerHTML = tamplate;
  return elDiv;
};

export default filter;
