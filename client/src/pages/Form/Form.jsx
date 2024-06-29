import { useTelegram } from "../../app/hooks/telegram";
import { useState } from "react";
import { MultiStepForm } from "../../widgets/MultiStepForm";

function Page() {
	const { user } = useTelegram();
	console.log("USER", user);

	useState({
		age: "",
		gender: "",
		self_employed: false,
		family_history: false,
		no_employees: 0,
		remote_work: false,
		benefits: false,
		wellness_program: false,
		seek_help: false,
		leave: true,
		mental_health_consequence: false,
		coworkers: false,
		supervisor: false,
		mental_vs_physical: false,
	});

	return (
		<div>
			<MultiStepForm />
		</div>
	);
}

export default Page;
