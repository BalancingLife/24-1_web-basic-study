function disableSectionElements($target, outerClass, innerClass) {
  $target
    .querySelectorAll(`${outerClass} ${innerClass}`)
    .forEach((el) => (el.disabled = true));
}

export default disableSectionElements;

//$ 기호는 DOM node 라는 의미.
