wp.blocks.registerBlockType("ourblocktheme/singleprofessor", {
  title: "Our Single Professor",
  edit: function () {
    return wp.element.createElement(
      "div",
      { className: "our-placeholder-block" },
      "Single Professor Placeholder"
    );
  },
  save: function () {
    return null;
  },
});
