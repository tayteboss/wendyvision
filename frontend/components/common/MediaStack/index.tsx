import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';
import { MediaType } from '../../../shared/types/types';

const MediaStackWrapper = styled.div``;

type Props = {
	data: MediaType;
	isPriority?: boolean;
};

const MediaStack = (props: Props) => {
	const { data, isPriority = false } = props ?? {};

	const useVideo = data?.mediaType === 'video';

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-5%'
	});

	return (
		<MediaStackWrapper ref={ref}>
			{useVideo && (
				<VideoComponent
					data={data}
					inView={inView}
					isPriority={isPriority}
				/>
			)}
			{!useVideo && (
				<ImageComponent
					data={data}
					isPriority={isPriority}
					inView={inView}
				/>
			)}
		</MediaStackWrapper>
	);
};

export default MediaStack;
