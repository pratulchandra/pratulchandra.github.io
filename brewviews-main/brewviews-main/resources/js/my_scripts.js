function openModal(clicked_id) {

	/* Note that you do NOT have to do a document.getElementById anywhere in this exercise. Use the elements below */
	document.getElementById("brew_name").placeholder = clicked_id;
	document.getElementById("brew_name").value = clicked_id;
}

  