import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import pxToRem from "../utils/pxToRem";

export const GlobalStyles = createGlobalStyle`
	:root {
		--colour-white: ${theme.colours.white};
		--colour-black: ${theme.colours.black};
		--font-default: ${theme.fonts.default};
		--transition-speed-default: ${theme.transitionSpeed.default};
		--transition-speed-fast: ${theme.transitionSpeed.fast};
		--transition-speed-extra-fast: ${theme.transitionSpeed.extraFast};
		--transition-speed-slow: ${theme.transitionSpeed.slow};
		--transition-speed-extra-slow: ${theme.transitionSpeed.extraSlow};
		--transition-ease: cubic-bezier(0.65, 0, 0.35, 1);
	}

	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		list-style: none;
		background: none;
		outline: none;
		border-radius: 0;
		box-shadow: none;
	}

	-webkit-text-size-adjust: 100%;

	::selection {
		background-color: black;
		color: white;
	}

	html {
		background: var(--colour-white);
		font-size: 16px;

		&.no-scroll {
			overflow-y: hidden;
			
			body {
				overflow-y: hidden;
			}
		}
	}

	body {
		position: relative;
	}

	input,
	textarea,
	select,
	button,
	label,
	body {
		font-family: var(--font-default);
		color: var(--colour-black);
		line-height: normal;
	}

	strong,
	b {
		font-weight: 900;
	}

	em {
		font-style: italic;
	}

	a {
		text-decoration: underline;
		color: var(--colour-black);
	}

	button {
		cursor: pointer;
	}

	h1,
	.type-h1 {
		font-size: ${pxToRem(48)};
		line-height: ${pxToRem(48)};

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(38)};
			line-height: ${pxToRem(38)};
		}

		@media ${theme.mediaBreakpoints.mobile} {
			font-size: ${pxToRem(28)};
			line-height: ${pxToRem(28)};
		}
	}

	h2,
	.type-h2 {
		font-size: ${pxToRem(48)};
		line-height: ${pxToRem(48)};

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(38)};
			line-height: ${pxToRem(38)};
		}

		@media ${theme.mediaBreakpoints.mobile} {
			font-size: ${pxToRem(28)};
			line-height: ${pxToRem(28)};
		}
	}

	h3,
	.type-h3 {
		font-size: ${pxToRem(48)};
		line-height: ${pxToRem(28)};

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(38)};
			line-height: ${pxToRem(38)};
		}

		@media ${theme.mediaBreakpoints.mobile} {
			font-size: ${pxToRem(28)};
			line-height: ${pxToRem(28)};
		}
	}

	h4,
	.type-h4 {
		font-size: ${pxToRem(48)};
		line-height: ${pxToRem(28)};

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(38)};
			line-height: ${pxToRem(38)};
		}

		@media ${theme.mediaBreakpoints.mobile} {
			font-size: ${pxToRem(28)};
			line-height: ${pxToRem(28)};
		}
	}

	p,
	.type-p,
	a,
	button,
	div {
		font-size: ${pxToRem(16)};
		line-height: ${pxToRem(16)};
	}

	mux-player {
		--media-object-fit: contain;
		--media-object-position: center;
		--controls: none;
		--media-object-fit: cover;
		--media-object-position: center;
	}

	.view-element-fade-in
	{
		opacity: 0;

		transition: opacity var(--transition-speed-default) ease;

		&--in-view
		{
			opacity: 1;
		}
	}

	.view-element-bottom-top
	{
		opacity: 0;
		transform: translateY(15px);

		transition: opacity var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1), transform var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1);

		&--in-view
		{
			opacity: 1;
			transform: translateY(0);
		}
	}

	.view-element-scale-up
	{
		transform: scale(0.95);
		opacity: 0;

		transition: opacity var(--transition-speed-default) ease, transform var(--transition-speed-default) ease;

		&--in-view
		{
			opacity: 1;
			transform: scale(1);
		}
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	.performance {
		-webkit-transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0,0,0);
		transform: translateZ(0);
	}

	::placeholder {
		color: currentcolor;
		opacity: 1;
	}

	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}

	input[type="hidden"] {
		display: none;
	}

	input,
	textarea,
	select {
		padding: 0.125rem 0;
		font-size: ${pxToRem(16)};
		width: 100%;
		appearance: none;
	}

	input::placeholder,
	textarea::placeholder {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	textarea {
		min-height: 5rem;
	}

	label {
		display: inline-block;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	img,
	video {
		max-width: 100%;
		display: block;
		height: auto;
	}

	iframe {
		max-width: 100%;
		display: block;
	}


	html.lenis {
		height: auto;
	}

	.lenis.lenis-smooth {
		scroll-behavior: auto !important;
	}

	.lenis.lenis-smooth [data-lenis-prevent] {
		overscroll-behavior: contain;
	}

	.lenis.lenis-stopped {
		overflow: hidden;
	}

	.lenis.lenis-scrolling iframe {
		pointer-events: none;
	}
`;
