const fhirEndpoint = 'http://fhirserver.hl7fundamentals.org/fhir/AllergyIntolerance/';
const form = document.getElementById("allergy-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    var FHIRpatientId = form.elements["patient-id"].value;
    var FHIRasserterId = form.elements["asserter-id"].value;
    var FHIRclinicalStatus = form.elements["clinicalStatus"].value;
    var FHIRverificationStatus = form.elements["verificationStatus"].value;
    var FHIRcategory = form.elements["category"].value;
    var FHIRcriticality = form.elements["criticality"].value;
    var FHIRonsetDate = form.elements["onsetDate"].value;
    var FHIRallergyCode = form.elements["allergyCode"].value;
    var FHIRselectAllergyCode = document.getElementById("allergyCode");
    var FHIRselectedOptionAllergyCode = FHIRselectAllergyCode.options[FHIRselectAllergyCode.selectedIndex];
    var FHIRselectedLabelAllergyCode = FHIRselectedOptionAllergyCode.label;
    var FHIRreactionManifestation = form.elements["reactionManifestation"].value;
    var FHIRselectReactionManifestation = document.getElementById("reactionManifestation");
    var FHIRselectedOptionReactionManifestation = FHIRselectReactionManifestation.options[FHIRselectReactionManifestation.selectedIndex];
    var FHIRselectedLabelReactionManifestation = FHIRselectedOptionReactionManifestation.label;
    var FHIRallergyNotes = form.elements["allergyNotes"].value;

    var AllergyIntolerance = {
        resourceType: "AllergyIntolerance",
        clinicalStatus: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                    code: FHIRclinicalStatus
                }
            ]
        },
        verificationStatus: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                    code: FHIRverificationStatus
                }
            ]
        },
        type: "allergy",
        category: [
            FHIRcategory
        ],
        criticality: FHIRcriticality,
        code: {
            coding: [
                {
                    system: "https://startrek.com/database",
                    code: FHIRallergyCode,
                    display: FHIRselectedLabelAllergyCode

                }
            ]
        },
        patient: {
            reference: `Patient/${FHIRpatientId}`
        },
        onsetDateTime: FHIRonsetDate,
        asserter: {
            reference: `Practitioner/${FHIRasserterId}`
        },
        note: [
            {
                text: FHIRallergyNotes
            }
        ],
        reaction: [
            {
                manifestation: [
                    {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: FHIRreactionManifestation,
                                display: FHIRselectedLabelReactionManifestation
                            }
                        ]
                    }
                ]
            }
        ]
    };

    console.log(AllergyIntolerance);

    const headers = {
        'Content-Type': 'application/json'
    };

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(AllergyIntolerance)
    };

    fetch(fhirEndpoint, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
});
