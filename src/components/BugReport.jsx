import { useState, useEffect, forwardRef } from "react"

/* 
	Netlify Stateful Form - Also need a duplicate shell form in index.html
*/

const BugReport = forwardRef(function BugReport(props, ref) {
	const { close } = props;

	const [formData, setFormData] = useState({
		message: ""
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevForm => ({
			...prevForm,
			[name]: value
		}))
	}

	const [errors, setErrors] = useState({});

	const validate = (formData) => {
		let formErrors = {};
		if(!formData.message) {
			formData.message = "Bug Detail is Required";
		}
		return formErrors;
	}

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = e => {
		setErrors(validate(formData));
		setIsSubmitted(true);
		e.preventDefault();
		close();
	}

	const encode = data => {
		return Object.keys(data)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
			.join('&');
	}

	// Post to Netlify
	useEffect(() => {
		if(Object.keys(errors).length === 0 && isSubmitted) {
			fetch("/", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: encode({"form-name": "bug report", ...formData})
			})
				.then(() => alert("Bug Submitted!"))
				.then(() => {
					setIsSubmitted(false);
					setFormData({message: ""});
				})
				.catch(err => alert(err));
		}
	}, [errors, formData, isSubmitted]);

	return (
		<dialog ref={ref}
			className="rounded-2xl relative px-12 pt-1 pb-10">

			<button className="btn btn-circle btn-sm absolute top-2.5 left-2" onClick={close} title="Close">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>

			<h2 className="mt-0.5 mb-4 text-4xl bold">Report a Bug</h2>

			{/* Netlify Form */}
			<form className="flex-grow flex flex-col gap-6"
				onSubmit={handleSubmit}>
				{/* Netlify form stuff */}
				<input type="hidden" name="form-name" value="bug-report" />

				<div hidden>
					<input name="bot-field" />
				</div>

				<label><span className="text-xl">Bug Description:</span>
					<textarea name="message" rows="6" cols="54" required
						className="mt-1 block textarea textarea-accent resize-none"
						value={formData.message}
						onChange={handleChange}
					></textarea>
					{errors.message && <p>{errors.message}</p>}
				</label>
				<button type="submit"
					className="btn">Send</button>
			</form>
		</dialog>
	)
});

export default BugReport;