export const cp = (transcript: string, ytUrl: string): string => {
  return `
    Create a youtube community post based on the following YouTube transcript:
    "${transcript}"
    Tone: Informal, 
    Word limit: 300 words, 
    translation if required,
    keep the response in english only, 
    include more emojis to keep it engaging and mention the youtube video url at the end of the post, 
    url: ${ytUrl}
    Identify the tone of the transcript, if it is serious and mysterious, keep the community post serious as well, 
    otherwise adjust it according to the tone of the video transcript, 
    keep each line short and sweet, try to break each point into a bulletpoint, 
    so that it is easy to read for everyone
    Organize it in the form which is readable by using backslash n's
    \n\n### Youtube Community Post:\n
`;
};

export const twitter = (transcript: string, ytUrl: string): string => {
  return `
    Create a twitter thread based on the following YouTube transcript:
    "${transcript}"
    Tone: Informal, 
    Word limit: 300 words, 
    translation if required,
    keep the response in english only, 
    include more emojis to keep it engaging
    Identify the tone of the transcript, if it is serious and mysterious, keep the post serious as well, 
    otherwise adjust it according to the tone of the video transcript, 
    keep each line short and sweet, try to break each point into a bulletpoint, 
    so that it is easy to read for everyone
    Organize it in the form which is readable by using backslash n's
    \n\n### Twitter Thread:\n
`;
};

export const linkedin = (transcript: string, ytUrl: string): string => {
  return `
    Create a Linkedin post based on the following YouTube transcript:
    "${transcript}"
    Tone: Informal, 
    Word limit: 300 words, 
    translation if required,
    keep the response in english only, 
    include more emojis to keep it engaging
    Identify the tone of the transcript, if it is serious and mysterious, keep the linkedin post serious as well, 
    otherwise adjust it according to the tone of the video transcript, 
    keep each line short and sweet, try to break each point into a bulletpoint, 
    so that it is easy to read for everyone\n\n
    Organize it in the form which is readable by using backslash n's
    \n\n### Linkedin Post:\n
`;
};

export const ytScript = (videoTopic: string): string => {
  return `
    Create a Youtube Video Script on the Topic: \n
    ${videoTopic} \n\n
    The Script should be detailed, cover the pointers in details and should be of a friendly tone!\n
    The Script should be in HTML Format, will all the relevant tags\n
    Add BR Tag, after every heading completion\n
    Youtube Video Script in HTML Format:\n\n
`;
};

export const createNew = (videoTopic: string): string => {
  //   return `
  //     Create a Youtube Video Script on the Topic: \n
  //     ${videoTopic} \n\n
  //     The Script should be detailed, cover the pointers in details and should be of a friendly tone!\n
  //     The Script should be in Markdown Format, which is compatible with react-markdown library \n
  //     Youtube Video Script in Markdown Format:\n\n
  // `;
  return `Please recommend me places to visit from Banasthali University in Rajasthan. The format should in this format: {
  placeName: "",
  placeCoordinates: "",
}`;
};

export const youtubeSEO = (videoTopic: string): string => {
  return `
    Create Youtube Video Title, Description, and Video Tags Based on the following Topic: \n
    ${videoTopic} \n\n
    The format should be like 
    Title: "" \n
    Description: "" \n
    Video Tags: "" \n
    \n\n
    Video Tags should be seperated by comma and should be >430 and <500 characters [FOLLOW THIS STRICTLY] \n
    Also format the data with the help of Backslash n's\n\n
    Youtube Video Script:\n\n
`;
};
