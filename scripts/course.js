function goToPage(button) {
    const url = button.getAttribute("data-page");
    window.location.href = url;
}