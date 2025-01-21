"use client";

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import '../footer.css';

export default function Footer() {
    return (
        <div className="footer" >

            <div className="item1" >
                <div>
                    <h1>SEAB</h1>
                    <p>Vi underlättar din vardag</p>
                </div>

                    <label htmlFor='username' className="new-letter">Prenumerera på vårt nyhetsbrev:
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Mailadress"
                            className="email-input"
                        />
                        <button id="subscribe-btn" onClick={() => window.location.reload()} ><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                    </label>

            </div>
            <div className="item2" >
                <div className="footer-links" >
                    <p>Om oss</p>
                    <p>Prislista</p>
                    <p>FAQ</p>
                    <p>Kundsupport</p>
                    <p>Användarvillkor</p>
                </div>
            </div>
        </div>
    )
}
