import Sketch from "react-p5";

export const Canvas = ({ emotions, probability }) => {
	console.log(probability);

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(window.outerWidth, window.outerHeight).parent(
			canvasParentRef,
		);
		p5.noLoop();
	};

	const draw = (p5) => {
		p5.clear();
		const { anger, sadness, fear, surprise, joy, neutral, disgust } =
			emotions;

		// Определение оттенка (hue) в зависимости от доминирующей эмоции
		let hue;
		if (anger + disgust > joy + sadness + neutral) {
			hue = 0; // Красный цвет для гнева и отвращения
		} else if (sadness > joy + anger + neutral) {
			hue = 60; // Желтый цвет для грусти
		} else if (joy > sadness + anger + neutral) {
			hue = 120; // Зеленый цвет для радости
		} else {
			hue = 180; // Голубой цвет для нейтрального состояния
		}

		const saturation = 100;
		const emotionalIntensity =
			anger + disgust + fear + sadness + joy + surprise;
		let brightness;

		if (neutral > 0.5) {
			brightness = 50; // Бледный цвет для нейтрального состояния
			hue = 180; // Голубой цвет для нейтрального состояния
		} else {
			brightness = emotionalIntensity * 100;
		}

		// Ограничиваем яркость, чтобы не выйти за пределы допустимых значений
		const adjustedBrightness = Math.min(brightness, 100);

		p5.colorMode(p5.HSB);
		p5.fill(hue, saturation, adjustedBrightness);
		p5.noStroke();

		const centerX = p5.width * 0.5;
		const centerY = p5.height * 0.5;
		const radius = 100;

		// Определение сглаженности формы
		const smoothness = 1 - (anger + disgust + fear);
		const maxDeformation = 0.5; // Максимальная деформация от гладкого круга

		p5.beginShape();
		for (let i = 0; i < 360; i += 10) {
			// Увеличиваем шаг для угловатости при агрессии
			let angle = p5.radians(i);
			// Добавляем рандомный фактор для внесения угловатости
			let deformation =
				p5.map(smoothness, 0, 1, maxDeformation, 0) * p5.noise(i);
			let x = centerX + p5.cos(angle) * radius * (1 - deformation);
			let y = centerY + p5.sin(angle) * radius * (1 - deformation);
			p5.vertex(x, y);
		}
		p5.endShape(p5.CLOSE);
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
