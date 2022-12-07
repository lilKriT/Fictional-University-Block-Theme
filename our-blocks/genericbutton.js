import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  PanelRow,
  ColorPalette,
} from "@wordpress/components";
import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  InspectorControls,
  BlockControls,
  __experimentalLinkControl as LinkControl,
  getColorObjectByColorValue,
} from "@wordpress/block-editor";
import { link } from "@wordpress/icons"; // you need to install this one!
import { useState } from "@wordpress/element";

registerBlockType("ourblocktheme/genericbutton", {
  title: "Generic Button",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
    linkObject: { type: "object", default: { url: "" } },
    colorName: { type: "string", default: "blue" },
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

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink });
  }

  function handleColorChange(colorCode) {
    // Find name of color
    const { name } = getColorObjectByColorValue(ourColors, colorCode);
    props.setAttributes({ colorName: name });
  }

  const ourColors = [
    { name: "blue", color: "#0d3b66" },
    { name: "orange", color: "#ee964b" },
    { name: "dark-orange", color: "#f95738" },
  ];
  const currentColorValue = ourColors.filter((color) => {
    return color.name == props.attributes.colorName;
  })[0].color;

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

      <InspectorControls>
        <PanelBody title="Color" initialOpen={true}>
          <PanelRow>
            <ColorPalette
              colors={ourColors}
              value={currentColorValue}
              onChange={handleColorChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <RichText
        tagName="a"
        allowedFormats={[]}
        className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
      {isLinkPickerVisible && (
        <Popover position="middle center">
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />
          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Save Link
          </Button>
        </Popover>
      )}
    </>
  );
}

function SaveComponent(props) {
  return (
    <a
      href={props.attributes.linkObject.url}
      className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
    >
      {props.attributes.text}
    </a>
  );
}
