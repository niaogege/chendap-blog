const DEFAULT_NAV_HEIGHT = 72;

export function scrollToTarget(target: HTMLElement, isSmooth: boolean) {
  const targetPadding = parseInt(
    window.getComputedStyle(target).paddingTop,
    10
  );

  const targetTop =
    window.scrollY +
    target.getBoundingClientRect().top -
    DEFAULT_NAV_HEIGHT +
    targetPadding;
  // Only scroll smoothly in page header anchor
  window.scrollTo({
    left: 0,
    top: targetTop,
    ...(isSmooth ? { behavior: "smooth" } : {}),
  });
}

export function bindingWindowScroll() {
  // Initial scroll position
  function scrollTo(el: HTMLElement, hash: string, isSmooth = false) {
    let target: HTMLElement | null = null;
    try {
      target = el.classList.contains("header-anchor")
        ? el
        : document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch (e) {
      console.warn(e);
    }
    if (target) {
      scrollToTarget(target, isSmooth);
    }
  }

  window.addEventListener(
    "click",
    (e) => {
      // Only handle a tag click
      const link = (e.target as Element).closest("a");
      if (link) {
        const { origin, hash, target, pathname, search } = link;
        const currentUrl = window.location;
        // only intercept inbound links
        if (hash && target !== "_blank" && origin === currentUrl.origin) {
          // scroll between hash anchors in the same page
          if (
            pathname === currentUrl.pathname &&
            search === currentUrl.search &&
            hash &&
            link.classList.contains("header-anchor")
          ) {
            e.preventDefault();
            history.pushState(null, "", hash);
            // use smooth scroll when clicking on header anchor links
            scrollTo(link, hash, true);
            // still emit the event so we can listen to it in themes
            window.dispatchEvent(new Event("hashchange"));
          }
        }
      }
    },
    { capture: true }
  );
  window.addEventListener("hashchange", (e) => {
    e.preventDefault();
  });
}
