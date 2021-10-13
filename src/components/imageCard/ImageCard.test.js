import { render, screen } from '@testing-library/react';
import ImageCard from './ImageCard';

const sampleImage = {
    id: 736877,
    tags: "tree, cat, silhouette",
    previewURL: "https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736877_150.jpg",
    user_id: 909086,
    user: "Bessi",
    userImageURL: "https://cdn.pixabay.com/user/2019/04/11/22-45-05-994_250x250.jpg"
}

beforeEach(() => {
    render(<ImageCard image={sampleImage} loading={false} />);
});

test('renders image element when loading is FALSE', () => {
    const imageElement = screen.getByTestId(/image/i);
    expect(imageElement).toBeInTheDocument();
});

describe("Author element tests", () => {
    test('renders author element when loading is FALSE', () => {
        const authorElement = screen.getByText(/by Bessi/i);
        expect(authorElement).toBeInTheDocument();
    });

    test('renders author element when loading is FALSE and the author name is longer than intended', () => {
        render(<ImageCard image={{ ...sampleImage, user: "VeryLongAuthorName" }} loading={false} />);
        const authorElement = screen.getByText(/by VeryLong.../i);
        expect(authorElement).toBeInTheDocument();
    });
});

test('renders author avatar element when loading is FALSE', () => {
    const authorAvatarElement = screen.getByTestId(/author-avatar/i);
    expect(authorAvatarElement).toBeInTheDocument();
});


describe("Tags element tests", () => {
    test('renders tags element when loading is FALSE', () => {
        const authorElement = screen.getByText(/tags: tree, cat, silhouette/i);
        expect(authorElement).toBeInTheDocument();
    });

    test('renders tags element when loading is FALSE and the tags are longer than intended', () => {
        render(<ImageCard image={{ ...sampleImage, tags: "VeryLongTagsArrayVeryLongTagsArrayVeryLongTagsArray" }} loading={false} />);
        const authorElement = screen.getByText(/tags: VeryLongTagsArrayVeryLongTagsArrayVeryLong.../i);
        expect(authorElement).toBeInTheDocument();
    });
});
