import React from "react";
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Progress, Row, Col, Typography } from "antd";
const { Title, Paragraph } = Typography;

const CountdownTimer = () => {
	const { startTime, endTime } = useContext(GlobalContext);

	const [remainingTime, setRemainingTime] = useState(null);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			if (now < startTime) {
				setRemainingTime(startTime - now);
			} else if (now > endTime) {
				setRemainingTime(null); // Countdown has ended
				clearInterval(intervalId);
			} else {
				setRemainingTime(endTime - now);
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [startTime, endTime]);

	const formatTime = time => {
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time % 60000) / 1000);
		return `${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	const totalTime = endTime - startTime;
	const progressBarValue = remainingTime
		? ((totalTime - remainingTime) / totalTime) * 100
		: 100;

	return (
		<Row justify="center" align="middle">
			<Col flex="1" span={6}>
				<Row justify="center" align="middle" gutter={[0, 16]}>
					<Col>
						<Typography>
							<Title level={4}>Start Time</Title>
							<Paragraph>
								{`${new Date(
									parseInt(startTime)
								).toUTCString()}`}
							</Paragraph>
						</Typography>
					</Col>
				</Row>
				<Row justify="center" align="middle" gutter={[0, 16]}>
					<Col>
						<Title level={4}>End Time</Title>
						<Paragraph>
							{new Date(parseInt(endTime)).toUTCString()}
						</Paragraph>
					</Col>
				</Row>
			</Col>

			<Col>
				<Progress
					type="circle"
					status="active"
					percent={progressBarValue.toFixed(3)}
					strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
				/>
			</Col>
		</Row>
	);
};

export default CountdownTimer;
