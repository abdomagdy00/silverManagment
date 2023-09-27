import "./styles/select.scss";

export const SelectBox = ({ name, label, options, onChange, ...rest }) => {
	if (typeof options[0] === "object") {
		return (
			<select className="selectbox" name={name} onChange={onChange} {...rest}>
				<option value="">{label || "اختر..."}</option>
				{options.map(({ name, value }) => (
					<option className="option" value={value} key={name}>
						{name}
					</option>
				))}
			</select>
		);
	}

	return (
		<select className="selectbox" name={name} onChange={onChange} {...rest}>
			<option value="">{label || "اختر..."}</option>
			{options.map((name) => (
				<option className="option" value={name} key={name}>
					{name}
				</option>
			))}
		</select>
	);
};
