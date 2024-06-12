export function countRelativePath({length}: {length: number}): string{

    let relativePath = '';
    for (let i = 0; i < length; i++) {
        relativePath += '../';
    }
    console.log({relativePath})
    return relativePath;
}