import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function UseFormInput({ defaultValue, type, placeholder }) {
	const [value, setValue] = useState(defaultValue || '');
	const input = (
		<Form.Control
			value={value || ''}
			placeholder={placeholder}
			onChange={(e) => setValue(e.target.value)}
			type={type}
		/>
	);
	return [value, input, setValue];
}
