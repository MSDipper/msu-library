import { msuClient } from "@/01_app/api/client.js"
import { getAllDocumentsResourcesGet, searchDocumentSearchGet } from "@/01_app/api/client/services.gen"
import store from "@/01_app/Store.js"

// we need this type for document table 
// { file: "Теоремы и задачи функана Кириллов Гвишиани.pdf", discipline: "Функциональный анализ", type: "Литература", year: 1988, author: "", download: `` },

/**
 * @typedef Document
 * @property { string } file
 * @property { string } discipline
 * @property { string } type
 * @property { number } years
 * @property { string } author
 * @property { string } download
 * @property { boolean } is_file
 */

/**
 * 
 * @returns { Array<Document> } Documents for catalog table {@link Document}
 */
export const getAllDocumentsToTable = async() => {
    const filterQuery = {
        subjectArray: store.subject.size ? store.getFilterArrByKey('subject').join(',') : '',
        semesterArray: store.semester.size ? store.getFilterArrByKey('semester').join(',') : '',
        teacherArray: store.teacher.size ? store.getFilterArrByKey('teacher').join(',') : '',
        subjectTypeArray: store.category.size ? store.getFilterArrByKey('category').join(',') : '',
    }
    console.info(filterQuery)
    const { data } = await getAllDocumentsResourcesGet({
        client:msuClient,
        query: {
            ...filterQuery
        }
    })
    // console.log(data)
    const mappedData = data.map((document) => ({
        file: document.name, 
        discipline: document.subject_name, 
        type: document.category_name, 
        year: document.year, 
        author: document.teacher_name, 
        download: document.is_file
        // download: `logic for download pdf`
    }))
    
    return mappedData
}

/**
 * @param {string} searchValue for prompt
 * @returns { Array<Document> } Documents for catalog table {@link Document}
 */

 export const getSearchedDocumentsToTable = async(query) => {
    console.log(query)
    // хапись и чтение с localStore
    const filterQuery = {}
    const { data } = await searchDocumentSearchGet({
        client:msuClient, 
        query: {
            prompt: query.prompt || '',
            ...filterQuery
        }

    })
    console.log(data)
    const mappedData = data.map((document) => ({
        file: document.name, 
        discipline: document.subject_name, 
        type: document.category_name, 
        year: document.year, 
        author: document.teacher_name, 
        download: document.is_file
        // download: `logic for download pdf`
    }))
    
    return mappedData
}