wp.blocks.registerBlockType("ourblocktheme/page", {
  title: "Our Page",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "Page Placeholder"
    );
  },
  save: function () {
    return null;
  },
});
