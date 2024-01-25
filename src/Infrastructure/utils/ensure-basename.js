if (!window.location.pathname.includes("/v1")) {
    window.history.replaceState(
        '',
        '',
        "/v1" + window.location.pathname
    );
}