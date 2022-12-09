wp.blocks.registerBlockType("ourblocktheme/eventsandblogs", {
  title: "Events and Blogs",
  supports: {
    align: ["full"],
  },
  attributes: {
    align: { type: "string", default: "full" },
  },
  edit: function () {
    return wp.element.createElement("div", null, "This is a placeholder");
  },
  save: function () {
    return null;
  },
});
