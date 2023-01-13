import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../Redux/actions/index";
import style from "./Form.module.css";

const nameExpres = /^[a-z A-Z]+$/;
const numExpres = /^[\d]+$/;
const lifeExpres = /^[0-9]{2}(?=[- 0-9]{5})/;

const validate = (form) => {
    let errors = {};

    if (!form.name || !nameExpres.test(form.name)) errors.name = 'Name is required, it should not contain numbers';
    if (!form.min_height || !form.max_height || !numExpres.test(form.min_height) || !numExpres.test(form.max_height)) errors.height = 'Height is required';
    if (!form.min_weight || !form.max_weight || !numExpres.test(form.min_weight) || !numExpres.test(form.max_weight)) errors.weight = 'Weight is required';
    if (!form.life_span || !lifeExpres.test(form.life_span)) errors.life_span = 'Lifespan is required, type only numbers separated by space and dash ( - )';
    return errors;
};

export default function FormAddDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        life_span: '',
        image: '',
    });

    const [form, setForm] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(() => {
        if (form.name.length && 
            form.min_height.length &&
            form.max_height.length && 
            form.min_weight.length && 
            form.max_weight.length &&
            nameExpres.test(form.name) &&
            numExpres.test(form.min_height) &&
            numExpres.test(form.max_height) &&
            numExpres.test(form.min_weight) &&
            numExpres.test(form.max_weight) &&
            lifeExpres.test(form.life_span))setButton(false);
        else setButton(true);
    }, [form, setButton]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(form));
        alert('The new dog was added successfully');
        setForm({
            name: '',
            min_height: '',
            max_height: '',
            min_weight: '',
            max_weight: '',
            life_span: '',
            image: '',
            temperaments: [],
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelect = (e) => {
        form.temperaments.includes(e.target.value) ? alert('that temperament already exists, please select another one or proceed to press "create dog"') : 
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        });
    };

    const handleDelete = (e) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter((temp) => temp !== e)
        });
    };
    
    return (
        <div className={`${style.main_wrapper}`}>
            <div className={`${style.container}`}>
                <Link to='/home'>
                    <button className={`${style.button_home}`}>Go Home</button>
                </Link>

                <form action="" id="form" onSubmit={handleSubmit} className={`${style.form}`}>
                    <div className={`${style.name_container}`}>
                        <input className={`${style.input_name}`} type="text" value={form.name} name='name' onChange={(e) => handleChange(e)} placeholder='Name...' />
                    </div>
                    <div className={`${style.error_form}`}>
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div className={`${style.height_container}`}>
                        <div className={`${style.min_height}`}>
                            <input type="text" value={form.min_height} name='min_height' onChange={(e) => handleChange(e)} placeholder='Min height...' />
                        </div>
                        <div className={`${style.max_height}`}>
                            <input type="text" value={form.max_height} name='max_height' onChange={(e) => handleChange(e)} placeholder='Max height...' />
                        </div>
                    </div>
                    <div className={`${style.error_form}`}>
                        {errors.height && <p>{errors.height}</p>}
                    </div>

                    <div className={`${style.weight_container}`}>
                        <div className={`${style.min_weight}`}>
                            <input type="text" value={form.min_weight} name='min_weight' onChange={(e) => handleChange(e)} placeholder='Min weight...' />
                        </div>
                        <div className={`${style.max_weight}`}>
                            <input type="text" value={form.max_weight} name='max_weight' onChange={(e) => handleChange(e)} placeholder='Max weight...' />
                        </div>
                    </div>
                    <div className={`${style.error_form}`}>
                        {errors.weight && <p>{errors.weight}</p>}
                    </div>

                    <div className={`${style.life_span_container}`}>
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder='Lifespan example: 10 - 12' onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={`${style.error_form}`}>
                        {errors.life_span && <p>{errors.life_span}</p>}
                    </div>

                    <div className={`${style.image_container}`}>
                        <input type="text" autoComplete="off" name="image" value={form.image} placeholder='Image url...' onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={`${style.error_form}`}>
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    
                    <div className={`${style.select_container}`}>
                        <h3>Select Temperaments</h3>
                    </div>
                    <div className={`${style.select_temp}`}>
                        <select className={`${style.selected_temperaments}`} onChange={handleSelect}>
                            <option>Temperaments</option>
                            {temperaments.map((e) => (
                                <option className={`${style.option_temperament}`} value={e.name} key={e.name+Math.random()}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`${style.container_button}`}>
                        <button className={`${style.button_add}`} disabled={button} type='submit' form='form'>Create Dog</button>
                    </div>
                </form>
                <div className={`${style.temperaments_container}`}>
                    <div className={`${style.temperaments}`}>
                        <h2>Temperaments</h2>
                    </div>
                    <div className={`${style.container_temperament}`}>
                        {form.temperaments.map((e) => 
                        <div className={`${style.element_temperament}`} key={e} onClick={() => handleDelete(e)}>
                            <p>{`${e}`}</p>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

