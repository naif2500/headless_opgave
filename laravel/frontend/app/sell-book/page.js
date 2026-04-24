"use client";
import { submitBook } from "@/lib/api";
import { getAuth } from "@/lib/getAuth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const hasCookie = getAuth();

    useEffect(() => {
        if (!hasCookie) redirect("/login");
    }, [hasCookie]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const res = await submitBook(data);

        if (res.data) {
            redirect("/books");
        }
    };

    return (
        <div className="page">
            <div className="breadcrumbs">
                <Link href="/" className="breadcrumb-link">
                    Hjem
                </Link>
                <span className="breadcrumb-sep">/</span>
                <span>Sælg en bog</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="inputs-row">
                    <div className="labeled-input">
                        <label htmlFor="title" className="form-label">
                            Bog titel
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input"
                            required
                        ></input>
                    </div>
                    <div className="labeled-input">
                        <label htmlFor="author" className="form-label">
                            Bog forfatter
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="form-input"
                            required
                        ></input>
                    </div>
                </div>

                <div className="inputs-row">
                    <div className="labeled-input">
                        <label htmlFor="publishing_date" className="form-label">
                            Udgivelsesdato
                        </label>
                        <input
                            type="date"
                            id="publishing_date"
                            name="publishing_date"
                            className="form-input"
                        ></input>
                    </div>
                    <div className="labeled-input">
                        <label htmlFor="genre" className="form-label">
                            Boggenre
                        </label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            className="form-input"
                            required
                        ></input>
                    </div>
                </div>

                <div className="inputs-row">
                    <div className="labeled-input">
                        <label htmlFor="price" className="form-label">
                            Pris
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-input"
                            required
                        ></input>
                    </div>
                    <div className="labeled-input">
                        <label htmlFor="image" className="form-label">
                            Billede
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-input"
                            accept=".png, .jpg, .jpeg"
                        ></input>
                    </div>
                </div>

                <div className="inputs-row">
                    <div className="labeled-input">
                        <label htmlFor="description" className="form-label">
                            Beskrivelse
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-input"
                            maxLength={255}
                            required
                        ></textarea>
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    Indsend bogen
                </button>
            </form>
        </div>
    );
};

export default Page;
