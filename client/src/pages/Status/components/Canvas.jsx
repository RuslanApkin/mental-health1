import Sketch from "react-p5";

export const Canvas = () => {
	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(window.outerWidth, window.outerHeight).parent(
			canvasParentRef,
		);
		p5.noLoop();
	};

	const draw = (p5) => {
		p5.ellipse(p5.width * 0.5, p5.height * 0.35, 70, 70);
	};

	return (
		<div
			style={{
				position: "absolute",
				overflow: "hidden",
				width: "100vw",
				height: "100vh",
				top: 0,
				left: 0,
			}}
		>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};
