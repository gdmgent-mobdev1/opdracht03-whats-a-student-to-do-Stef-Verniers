const todaysDate = () => {
  const date = new Date().toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  return date;
};

const showEditBlock = () => {
  const editBlock = document.querySelector<HTMLDivElement>('#dashboardEdits-form');
  if (editBlock?.classList.contains('open')) {
    editBlock.classList.remove('open');
  } else {
    editBlock?.classList.add('open');
  }
};

export { todaysDate, showEditBlock };
