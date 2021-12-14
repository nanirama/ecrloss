import React from 'react';
import PropTypes from 'prop-types';

import {
  CTA,
  ImageCTA,
  Hero,
  GridNav,
  Metrics,
  LogosStrip,
  TextBlock,
  ActionBar,
  Video,
  Image,
  Map,
  TeamGrid,
  PapersGrid,
} from './slices';

const SlicesRenderer = ({ slices }) => {
  if (!slices || slices.length === 0) return null;

  return slices.map((slice) => {
    switch (slice.slice_type) {
      case 'cta':
        return <CTA key={slice.id} slice={slice} />;
      case 'hero':
        return <Hero key={slice.id} slice={slice} />;
      case 'image_cta':
        return <ImageCTA key={slice.id} slice={slice} />;
      case 'grid_nav':
        return <GridNav key={slice.id} slice={slice} />;
      case 'metrics':
        return <Metrics key={slice.id} slice={slice} />;
      case 'logos_strip':
        return <LogosStrip key={slice.id} slice={slice} />;
      case 'text_block':
        return <TextBlock key={slice.id} slice={slice} />;
      case 'action_bar':
        return <ActionBar key={slice.id} slice={slice} />;
      case 'video':
        return <Video key={slice.id} slice={slice} />;
      case 'image':
        return <Image key={slice.id} slice={slice} />;
      case 'map':
        return <Map key={slice.id} slice={slice} />;
      case 'team':
        return <TeamGrid key={slice.id} slice={slice} />;
      case 'papers_grid':
        return <PapersGrid key={slice.id} slice={slice} />;

      default:
        return null;
    }
  });
};

SlicesRenderer.propTypes = {
  slices: PropTypes.array.isRequired,
};

export default SlicesRenderer;
