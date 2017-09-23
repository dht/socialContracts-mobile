import {contractToAR, contractToNow, contractToText, setFixedDate} from '../../utils/contracts';
import contract, {contract2} from '../../_mocks/contract-1ffb5554';

beforeAll(() => {
    const date = new Date();
    date.setDate(14);
    date.setMonth(8);
    date.setFullYear(2017);
    date.setHours(9);
    setFixedDate(date);
});


it('returns availability ranges for contract', () => {
    expect(contractToAR(contract, 3)).toEqual({
        phone: {d0: [[8.5, 18]], d1: [[10.5, 11], [17.5, 20]], d2: [[10.5, 11], [17.5, 20]], d3: [[8.5, 18]]},
        whatsapp: {d0: [[8.5, 18]], d1: [[10.5, 16]], d2: [[10.5, 16]], d3: [[8.5, 18]]},
        email: {d0: [[8]], d1: [[10]], d2: [[10]], d3: [[8]]},
        facebook: {d0: [[20]], d1: [[16]], d2: [[16]], d3: [[20]]},
    });
});

it('returns availability ranges for contract with planByDate', () => {
    expect(contractToAR(contract, 4)).toEqual({
        "phone": {
            "d0": [[8.5, 18]],
            "d1": [[10.5, 11], [17.5, 20]],
            "d2": [[10.5, 11], [17.5, 20]],
            "d3": [[8.5, 18]],
            "d4": [[9, 9.5], [12.75, 13], [15, 17]]
        },
        "whatsapp": {"d0": [[8.5, 18]], "d1": [[10.5, 16]], "d2": [[10.5, 16]], "d3": [[8.5, 18]], "d4": [[9, 9.5]]},
        "email": {"d0": [[8]], "d1": [[10]], "d2": [[10]], "d3": [[8]], "d4": [[8], [20.25]]},
        "facebook": {"d0": [[20]], "d1": [[16]], "d2": [[16]], "d3": [[20]], "d4": [[20.5]]}
    });
});

it('returns next relevant ranges for contract', () => {
    expect(contractToNow(contract)).toEqual({
        "email": {"d1": [10]},
        "facebook": {"d0": [20]},
        "phone": {"d0": [8.5, 18]},
        "whatsapp": {"d0": [8.5, 18]}
    });
});

it('returns next relevant ranges for contract #2', () => {
    expect(contractToNow(contract, 22)).toEqual({
        "email": {"d1": [10]},
        "facebook": {"d1": [16]},
        "phone": {"d1": [10.5, 11]},
        "whatsapp": {"d1": [10.5, 16]}
    });
});

it('returns next relevant ranges in text for contract', () => {
    expect(contractToText(contract)).toEqual({
        "email": "will check tomorrow at 10:00",
        "facebook": "will check Today at 20:00",
        "phone": "available now",
        "whatsapp": "available now"
    });
});

it('returns next relevant ranges in text for contract with planByDate', () => {
    expect(contractToText(contract2)).toEqual({
        "email": "will check tomorrow at 10:00",
        "facebook": "will check Today at 20:00",
        "phone": "Monday at 9:00",
        "whatsapp": "available now"
    });
});

