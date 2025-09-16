import React from 'react'

const Loading = ({ type, size, className }) => {
	if (type === 'dots') {
		return (
			<span className={"loading loading-dots loading-dots" + (size ? " " + size : "") + className || ""}></span>
		)
	}
	else if (type === 'ring') {
		return (
			<span className={"loading loading-dots loading-ring" + (size ? " " + size : "") + className || ""}></span>
		)
	}
	else if (type === 'ball') {
		return (
			<span className={"loading loading-dots loading-ball" + (size ? " " + size : "") + className || ""}></span>
		)
	}
	else if (type === 'bars') {
		return (
			<span className={"loading loading-dots loading-bars" + (size ? " " + size : "") + className || ""}></span>
		)
	}
	else if (type === 'infinity') {
		return (
			<span className={"loading loading-dots loading-infinity" + (size ? " " + size : "") + className || ""}></span>
		)
	} else {
		return (
			<span className={"loading loading-dots loading-spinner" + (size ? " " + size : "") + className || ""}></span>
		)
	}
}

export default Loading