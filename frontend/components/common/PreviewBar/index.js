/**
 * This component can be added to preview pages.
 * It shows a simple exit preview which will remove the previewData cookies.
 */
import Link from 'next/link';
import styled from 'styled-components';

const PreviewBarWrapper = styled.div`
	background: #000;
	padding: 10px;
  	color: #fff;
  
  	a {
	  color: #fff;
	}
`;

const PreviewBar = ({ preview }) => {
	if(!preview)
	{
		//No Preview mode enabled
		return <></>;
	}

	return (
		<PreviewBarWrapper>
			<h3>Preview Mode</h3>
			<Link href='/api/exit-preview'>Exit</Link>
		</PreviewBarWrapper>
	);
};

export default PreviewBar;