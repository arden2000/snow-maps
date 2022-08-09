import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageGallery({itemData}) {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.key}>
          <img
            src={item.url}
            srcSet={item.url}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

