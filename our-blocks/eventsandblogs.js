wp.blocks.registerBlockType("ourblocktheme/eventsandblogs", {
  title: "Events and Blogs",
  supports: {
    // align: ["full"],
  },
  attributes: {
    align: { type: "string", default: "full" },
  },
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "Events and blogs placeholder"
    );
  },
  save: function () {
    return null;
  },
});
