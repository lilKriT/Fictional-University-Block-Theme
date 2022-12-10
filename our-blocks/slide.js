import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { useEffect } from "@wordpress/element";

registerBlockType("ourblocktheme/slide", {
  title: "Slide",
  supports: {
    align: ["full"],
  },
  attributes: {
    align: { type: "string", default: "full" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: window.banner.fallbackimage },
    themeimage: { type: "string" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  useEffect(
    function () {
      if (props.attributes.imgID) {
        async function go() {
          const res = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET",
          });
          props.setAttributes({
            themeimage: "",
            imgURL: res.media_details.sizes.pageBanner.source_url,
          });
        }
        go();
      }
    },
    [props.attributes.imgID]
  );

  useEffect(function () {
    if (props.attributes.themeimage) {
      props.setAttributes({
        imgURL: `${slide.themeimagepath}${props.attributes.themeimage}`,
      });
    }
  }, []);

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose image</Button>;
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div
        className="hero-slider__slide"
        style={{
          backgroundImage: `url('${props.attributes.imgURL}')`,
        }}
      >
        <div className="hero-slider__interior container">
          <div className="hero-slider__overlay t-center">
            <InnerBlocks
              allowedBlocks={[
                "ourblocktheme/genericheading",
                "ourblocktheme/genericbutton",
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SaveComponent() {
  return <InnerBlocks.Content />;
}
