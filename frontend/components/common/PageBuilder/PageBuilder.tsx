import styled from 'styled-components';

type Props = {
	data: any;
};

const PageBuilderWrapper = styled.div``;

const PageBuilder = (props: Props) => {
	const { data } = props;

	// const sections: any = {
	// 	richText: RichTextSection,
	// 	media: MediaSection
	// };

	const sections: any = {};

	return (
		<PageBuilderWrapper className="page-builder">
			{data &&
				data.map((section: any, i: number) => {
					{
						if (!sections[section._type]) {
							return (
								<div key={Math.random() * 10000}>
									No section found for {section._type}
								</div>
							);
						} else {
							const Component = sections[section._type];
							return (
								<Component
									key={`${section._type}-${i}`}
									{...section}
								/>
							);
						}
					}
				})}
		</PageBuilderWrapper>
	);
};

export default PageBuilder;
