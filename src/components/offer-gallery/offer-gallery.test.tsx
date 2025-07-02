import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {makeMockImages} from '@/utils/mocks';
import {MAX_GALLERY_IMAGES} from '@/constants';
import OfferGallery from './offer-gallery';

describe('Component: OfferGallery', () => {
  const mockImages = makeMockImages();

  it('should render no more than "MAX_GALLERY_IMAGES" images', () => {
    render(
      <OfferGallery
        images={mockImages}
      />);

    expect(screen.getAllByRole('img')).toHaveLength(MAX_GALLERY_IMAGES);
  });

  it('should render all images when less than MAX_GALLERY_IMAGES', () => {
    const smallImagesSet = mockImages.slice(0, 1);

    render(
      <OfferGallery
        images={smallImagesSet}
      />);

    expect(screen.getAllByRole('img')).toHaveLength(smallImagesSet.length);
  });

  it('should render correct image sources and alt texts', () => {
    render(
      <OfferGallery
        images={mockImages}
      />);

    const images = screen.getAllByRole('img');
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockImages[index]);
      expect(img).toHaveAttribute('alt', 'Photo studio');
    });
  });

  it('should render correct with empty images array', () => {
    render(
      <OfferGallery
        images={[]}
      />);

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
