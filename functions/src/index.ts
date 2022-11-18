import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions/logger/compat";
admin.initializeApp();
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.sendSolapiRequest = functions.https.onCall(async (data, context) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires

  const { SolapiMessageService } = await require("solapi");

  const {
    to,
    disableSms,
    from,
    studioName,
    studentName,
    instructorName,
    genre,
    time,
    suspended,
    studioPhoneNumber,
  } = data;

  // eslint-disable-next-line max-len
  const messageService = new SolapiMessageService(
    process.env.SOLAPI_API_KEY,
    process.env.SOLAPI_SECRET_KEY
  );

  const solapiMessageObject = {
    to,
    from,
    kakaoOptions: {
      pfId: process.env.KAKAO_PFID,
      templateId: process.env.SUSPENDED_TEMPLATE_ID,
      variables: {
        "#{스튜디오}": studioName,
        "#{회원명}": studentName,
        "#{강사명}": instructorName,
        "#{타이틀}": genre,
        "#{시간}": time,
        "#{휴강사유}": suspended,
        "#{스튜디오번호}": studioPhoneNumber,
      },
      disableSms: disableSms,
    },
  };

  return messageService.sendOne(solapiMessageObject).then((res: unknown) => {
    return {
      message: res,
      logger: "solapi에 요청을 보냅니다.",
    };
  });
});
