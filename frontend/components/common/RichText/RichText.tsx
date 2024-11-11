import styled from 'styled-components';
import { PortableText } from '@portabletext/react';

const Content = styled.div``;

type Props = {
	data: any;
	className?: string;
};

const RichText = (props: Props) => {
	const { data, className = '' } = props;

	return (
		<>
			{data && (
				<Content className={`${className} content`}>
					<PortableText value={data} />
				</Content>
			)}
		</>
	);
};

export default RichText;
