import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { PlanetCanvas } from "./canvas";

import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";


const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        //h3KKxdGO6oM1Cm55j
        //template_82ct9ps
        //service_ba86wds

        emailjs
            .send(
                'service_ba86wds',
                'template_82ct9ps',
                {
                    from_name: form.name,
                    to_name: "Priyansh Negi",
                    from_email: form.email,
                    to_email: "priyansh.negiji@gmail.com",
                    message: form.message,
                },
                'h3KKxdGO6oM1Cm55j'
            )
            .then(
                () => {
                    setLoading(false);
                    alert("Thank you. I will get back to you as soon as possible.");

                    setForm({
                        name: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);

                    alert("Ahh, something went wrong. Please try again.");
                }
            );
    };

    return (
        <div
            className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden justify-center items-center h-[550px]`}
        >
            <motion.div
                variants={slideIn("up", "tween", 0.2, 1)}
                className='xl:flex-1 w-full h-full'
            >
                <PlanetCanvas />
            </motion.div>

        </div>
    );
};

export default SectionWrapper(Contact, "contact");
