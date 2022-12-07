import { ToolbarGroup, ToolbarButton, Popover } from "@wordpress/components";
import { registerBlockType } from "@wordpress/blocks";
import { RichText, BlockControls } from "@wordpress/block-editor";
import { link } from "@wordpress/icons"; // you need to install this one!
import { useState } from "@wordpress/element";

registerBlockType("ourblocktheme/genericbutton", {
  title: "Generic Button",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

  function handleTextChange(x) {
    props.setAttributes({ text: x });
  }

  function buttonHandler() {
    setIsLinkPickerVisible((prev) => !prev);
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={props.attributes.size === "large"}
            onClick={() => {
              props.setAttributes({ size: "large" });
            }}
          >
            Large
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.size === "medium"}
            onClick={() => {
              props.setAttributes({ size: "medium" });
            }}
          >
            Medium
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.size === "small"}
            onClick={() => {
              props.setAttributes({ size: "small" });
            }}
          >
            Small
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <RichText
        tagName="a"
        allowedFormats={[]}
        className={`btn btn--${props.attributes.size} btn--blue`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
      {isLinkPickerVisible && <Popover>Hello!!!</Popover>}
    </>
  );
}

function SaveComponent(props) {
  return (
    <a href="#" className={`btn btn--${props.attributes.size} btn--blue`}>
      {props.attributes.text}
    </a>
  );
}
