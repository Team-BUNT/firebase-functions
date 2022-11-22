import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions/logger/compat";
admin.initializeApp();
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

// 휴강 안내 알림톡
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

// 신청완료 알림톡
// eslint-disable-next-line max-len
exports.enrollmentComplete = functions.https.onCall(async (data, context) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires

  const { SolapiMessageService } = await require("solapi");

  const {
    to,
    disableSms,
    from,
    studioName,
    studioAddress,
    instructorName,
    genre,
    time,
    payment,
  } = data;

  // eslint-disable-next-line max-len
  const messageService = new SolapiMessageService(
    process.env.SOLAPI_API_KEY,
    process.env.SOLAPI_SECRET_KEY
  );

  const solapiEnrollmentMessage = {
    to,
    from,
    kakaoOptions: {
      pfId: process.env.KAKAO_PFID,
      templateId: process.env.ENROLLMENT_COMPLETE_TEMPLATE_ID,
      variables: {
        "#{스튜디오}": studioName,
        "#{주소}": studioAddress,
        "#{수업날짜}": time,
        "#{강사명}": instructorName,
        "#{타이틀}": genre,
        "#{결제방법}": payment,
      },
      disableSms: disableSms,
    },
  };

  // eslint-disable-next-line max-len
  return messageService.sendOne(solapiEnrollmentMessage).then((res: unknown) => {
    return {
      message: res,
      logger: "solapi에 신청완료 메세지 전송을 요청합니다.",
    };
  });
});

// 신청완료 무통장 알림톡
// eslint-disable-next-line max-len
exports.enrollmentCompleteAccountNumber = functions.https.onCall(async (data, context) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires

  const { SolapiMessageService } = await require("solapi");

  const {
    to,
    disableSms,
    from,
    studioName,
    studioAddress,
    instructorName,
    genre,
    time,
    studioAccountNumber,
  } = data;

  // eslint-disable-next-line max-len
  const messageService = new SolapiMessageService(
    process.env.SOLAPI_API_KEY,
    process.env.SOLAPI_SECRET_KEY
  );

  const solapiEnrollmentAccountNumberMessage = {
    to,
    from,
    kakaoOptions: {
      pfId: process.env.KAKAO_PFID,
      templateId: process.env.ENROLLMENT_COMPLETE_CREDIT_ACCOUNT_TEMPLATE_ID,
      variables: {
        "#{스튜디오}": studioName,
        "#{주소}": studioAddress,
        "#{수업날짜}": time,
        "#{강사명}": instructorName,
        "#{타이틀}": genre,
        "#{계좌번호}": studioAccountNumber,
      },
      disableSms: disableSms,
    },
  };

  // eslint-disable-next-line max-len
  return messageService.sendOne(solapiEnrollmentAccountNumberMessage).then((res: unknown) => {
    return {
      message: res,
      logger: "solapi에 신청완료 무통장 메세지 전송을 요청합니다.",
    };
  });
});
