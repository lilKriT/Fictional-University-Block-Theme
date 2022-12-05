import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";

registerBlockType("ourblocktheme/genericheading", {
  title: "Generic Heading",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  function handleTextChange(x) {
    props.setAttributes({ text: x });
  }

  return (
    <>
      <RichText
        tagName="h1"
        allowedFormats={["core/bold", "core/italic"]}
        className={`headline headline--${props.attributes.size}`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
    </>
  );
}

function SaveComponent() {
  return <div>Heading block here.</div>;
}
